import { Section, Tree, Card, Intent, Button, Icon, TreeNodeInfo } from '@blueprintjs/core'
import { QueryPage, NumberInput as NumberModelInput } from 'mobx-orm'
import { observer } from 'mobx-react-lite'
import { Org, OrgUserGroup } from '@/models/org'
import { useInput } from '@/utils'
import { useCallback, useEffect, useState } from 'react'
import { autorun, runInAction } from 'mobx'
import { IconNames } from '@blueprintjs/icons'
import { DeleteObjectButton } from '@/components/core/inputs/DeleteObjectButton'
import { ObjectFieldInlineInput } from '@/components/core/inputs/ObjectFieldInlineInput'
type NodePath = number[]


const OrgUserGroupTreeLabel = ((props: {group: OrgUserGroup, createNewGroup: (OrgUserGroup) => void }) => {
    const { group, createNewGroup } = props
    const [edit, setEdit] = useState(false)
    if (edit) {
        return <ObjectFieldInlineInput obj={group} field='name' onDone={() => setEdit(!edit)} />
    }
    else {
        return (
            <div className='flex items-center justify-between' >
                <span className='flex-auto'>{group.name}</span>
                <span onClick={(event) => { event.stopPropagation() }}>
                    {group.parent && <Button minimal={true} icon={IconNames.EDIT} onClick={() => setEdit(!edit)} />}
                    {group.parent && <DeleteObjectButton obj={group}/>}
                    <Button minimal={true} icon={IconNames.ADD} intent={Intent.SUCCESS}
                        onClick={(event) => {
                            event.stopPropagation()
                            createNewGroup(group) 
                        }} />
                </span>
            </div>
        )
    }
})

export interface OrgUserGroupTreeProps {
    orgs: QueryPage<Org> 
}

const OrgUserGroupTree = observer((props: OrgUserGroupTreeProps) => {
    const { orgs } = props
    const selectedGroupInput = useInput(NumberModelInput, { syncURL: 'org-user-group-id' }, true)
    const [tree, setTree] = useState([]) 
    const [update, setUpdate] = useState(false)
    const createNewGroup = useCallback((group: OrgUserGroup) => {
        // add flag to create child group
        (group as any).__createChild = true
        setUpdate(!update)
    }, [orgs, update])

    useEffect(() => {
        return autorun(() => {
            const tree = []
            function buildTree(group: OrgUserGroup ) : any {
                const needToCreateChild = !!(group as any).__createChild
                const treeNode = {
                    id          : group.id,
                    hasCaret    : group.children.length > 0 || needToCreateChild, 
                    isExpanded  : true,
                    isSelected  : selectedGroupInput.value === group.id,
                    label       : <OrgUserGroupTreeLabel group={group} createNewGroup={createNewGroup}/>,
                    icon        : group.parent_id ? IconNames.HOME : IconNames.PEOPLE,
                    childNodes  : [],
                    nodeData    : group
                }
                if (needToCreateChild) {
                    const newGroup = new OrgUserGroup({
                        parent_id: group.id,
                        org_id: group.org_id
                    })
                    treeNode.childNodes.push({
                        id          : -1,
                        hasCaret    : false,
                        isExpanded  : true,
                        label       : <ObjectFieldInlineInput obj={newGroup} field='name'
                                        onDone={() => {
                                            (group as any).__createChild = undefined
                                            setUpdate(!update)
                                        }}/>,
                        icon        : IconNames.HOME,
                        childNodes  : [],
                    })
                }
                for (const g of group.children) {
                    treeNode.childNodes.push(buildTree(g))
                }
                return treeNode
            }
            for (const org of orgs.items) {
                tree.push(buildTree (org.root_user_group))
            }
            setTree(tree)
        })
    }, [orgs, update])

    const handleNodeClick = (node: TreeNodeInfo<any>, nodePath: NodePath, e: React.MouseEvent<HTMLElement>) => {
        selectedGroupInput.set(node.nodeData?.id === selectedGroupInput.value ? undefined : node.nodeData?.id)
    }
    const handleNodeCollapse = (_node: TreeNodeInfo, nodePath: NodePath) => {
        const node = Tree.nodeFromPath(nodePath, tree)
        node.isExpanded = false
        setTree([...tree])
    }
    const handleNodeExpand = (_node: TreeNodeInfo, nodePath: NodePath) => {
        const node = Tree.nodeFromPath(nodePath, tree)
        node.isExpanded = true
        setTree([...tree])
    }

    return (
        <Section title="User Groups">
            <Card>
                { orgs.isLoading 
                    ? <div> Loading... </div>
                    : orgs.items.length === 0
                        ? <Card>No Orgs</Card>
                        : <Tree contents={tree}
                            onNodeClick     = {handleNodeClick}
                            onNodeCollapse  = {handleNodeCollapse}
                            onNodeExpand    = {handleNodeExpand}
                        />
                }
            </Card>
        </Section>
    )
})

export default OrgUserGroupTree
