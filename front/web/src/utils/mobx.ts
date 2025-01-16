/* eslint react-hooks/exhaustive-deps: 0 */ 
import { useMemo, useEffect, useState } from 'react'
import { Model, QueryProps, InputConstructorArgs, ObjectInputConstructorArgs, ObjectForm, Input, Query, QueryPage, QueryRaw, QueryRawPage, QueryCacheSync } from 'mobx-orm'
import { ModelForm } from './form'
import { wait } from '@testing-library/user-event/dist/cjs/utils/index.js'

/**
 *  Hooks for uging mobx-orm inputs and queries
 */


enum QueryType {
    QUERY               = 'getQuery',
    QUERY_PAGE          = 'getQueryPage',
    QUERY_RAW           = 'getQueryRaw',
    QUERY_RAW_PAGE      = 'getQueryRawPage',
    QUERY_CACHE_SYNC    = 'getQueryCacheSync',
}
const makeQuery = <M extends typeof Model, Q extends Query<InstanceType<M>>>(model: M, queryType: QueryType, options?: QueryProps<InstanceType<M>>)
    :[Query<InstanceType<M>>, Promise<Boolean>] => {
    const query = useMemo(() => model[queryType](options) as Q, [])
    const ready = useMemo<Promise<Boolean>>(() => query.ready(), [])  // invoke at FIRST time query loaded
    useEffect(() => () => query.destroy(), [])
    return [query as Query<InstanceType<M>>, ready]
}
export const useQuery = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    return makeQuery<M, Query<InstanceType<M>>>(model, QueryType.QUERY, options)
}
export const useQueryPage = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    return makeQuery<M, QueryPage<InstanceType<M>>>(model, QueryType.QUERY_PAGE, options)
}
export const useQueryRaw = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    return makeQuery<M, QueryRaw<InstanceType<M>>>(model, QueryType.QUERY_RAW, options)
}
export const useQueryRawPage = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    return makeQuery<M, QueryRawPage<InstanceType<M>>>(model, QueryType.QUERY_RAW_PAGE, options)
}
export const useQueryCacheSync = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    return makeQuery<M, QueryCacheSync<InstanceType<M>>>(model, QueryType.QUERY_CACHE_SYNC, options)
}

export const useInput = <T>(
    InputConstructor: (args?: InputConstructorArgs<T>) => Input<T>,
    options?: InputConstructorArgs<T>,
    reset?: Boolean
) => {
    const input = useMemo(() => InputConstructor(options), [])
    useEffect(() => {
        return () => {
            if (reset) input.set(undefined)
            input.destroy()
        }
    } , [])
    return input
}

export const useObjectInput = (
    InputConstructor: any,
    options: ObjectInputConstructorArgs<any, any>,
    reset?: Boolean
) => {
    const input = useMemo(() => new InputConstructor(options), [])
    useEffect(() => {
        return () => {
            if (reset) input.set(undefined)
            input.destroy()
        }
    } , [])
    return input
}

export const useModelForm = <T extends Model> (builder: ()=> ModelForm<T>) => {
    const form = useMemo(builder, [])
    useEffect(() => {
        return () => form.destroy()
    } , [])
    return form
}

export const useObject = <T extends Model> (asyncFunc: () => Promise<T>): [T|undefined, boolean] => { 
    const [object, setObject] = useState<T | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const waitObj = async () => {
            const obj: T = await asyncFunc()
            setObject(obj)
            setLoading(false)
        }
        waitObj()
    }, [])
    return [object, loading] 
}


