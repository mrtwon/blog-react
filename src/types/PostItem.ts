export type PostContent = {
    title: string,
    body: string
}
export type Post = {
    id: number,
    userId: number,
} & PostContent
export type Like = {
    userId: number,
    postId: number
}
export type UserContent = {
    login: string,
    name: string
}
export type User = {
    id: number,
} & UserContent
export type PostItem = {
    post: Post,
    user: User,
    likes: Like[]
}