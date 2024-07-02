export interface IRepo {
    name: string
    created_at: string //"2020-12-27T19:45:01Z"
    created_ago?: string
    owner: {
        login: string
    }
    size: number
}

export interface IRepoListProps {
    errorMessage: string
    list: IRepo[]
}

export type TypeAction = 'getRepos' | 'getStat' | null

