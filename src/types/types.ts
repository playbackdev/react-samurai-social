export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    contacts: ContactsType
    photos: PhotosType
};

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null;
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
};

export type PostType = {
    id: number
    text: string
    likesCount: number
};

export type UserType = {
    id: number
    name: number
    status: string
    photos: PhotosType
    followed: boolean
}