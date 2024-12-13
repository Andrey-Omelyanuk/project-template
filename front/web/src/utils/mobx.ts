/* eslint react-hooks/exhaustive-deps: 0 */ 
import { useMemo, useEffect } from 'react'
import { Model, QueryProps, InputConstructorArgs, ObjectInputConstructorArgs, ObjectForm, Input } from 'mobx-orm'

/**
 *  Hooks for uging mobx-orm inputs and queries
 */

export const useQuery = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    const query = useMemo(() => model.getQuery(options), [])
    useEffect(() => () => query.destroy(), [])
    return query
}

export const useQueryPage = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    const query = useMemo(() => model.getQueryPage(options), [])
    useEffect(() => () => query.destroy(), [])
    return query
}

export const useQueryRaw = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    const query = useMemo(() => model.getQueryRaw(options), [])
    useEffect(() => () => query.destroy(), [])
    return query
}

export const useQueryRawPage = <M extends typeof Model>(model: M, options?: QueryProps<InstanceType<M>>) => {
    const query = useMemo(() => model.getQueryRawPage(options), [])
    useEffect(() => () => query.destroy(), [])
    return query
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

export const useObjectForm = <M extends Model>(inputs, onSubmitted?, onCancelled?) => {
    const form = useMemo(() => new ObjectForm<M>(inputs, onSubmitted, onCancelled), [])
    // useEffect(() => {
    //     return () => form.destroy()
    // } , [])
    return form 
}
