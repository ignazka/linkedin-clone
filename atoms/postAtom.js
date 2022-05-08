import { atom } from 'recoil'

export const handlePostState = atom({
    key: 'handlePostState',
    default: false
})

export const getPostsState = atom({
    key: 'getPostState',
    default: {}
})

export const useSSRPostState = atom({
    key: 'useSSRPostState',
    default: true
})