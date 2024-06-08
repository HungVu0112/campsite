export type User = {
    id?: string,
    email?: string,
    username?: string,
    avatar?: string
}

export type City = {
    id?: number,
    name?: string,
    image?: string,
    provinces?: Province[]
}

export type Province = {
    id?: number,
    cityId?: number,
    name?: string,
    image?: string
}

export type Campsite = {
    id?: number,
    name?: string,
    star?: number,
    camePeople?: string,
    wantPeople?: string,
    detailLocation?: string,
    image?: string,
    cityId?: number,
    provinceId?: number,
    cityName?: string,
    provinceName?: string
}

export type Type = {
    id?: number,
    name?: string,
    image?: string
}

export type Plan = {
    id?: number,
    placeId?: number,
    title?: string,
    capacity?: string,
    pet?: string,
    price?: string,
    classify?: string,
    width?: string,
    checkIn?: string,
    checkOut?: string,
    earlyCheckIn?: string,
    parking?: string,
    AC?: string,
    breakfast?: string,
    dinner?: string,
    ground?: string,
    facility?: string,
    image?: string
}

export type Went = {
    id?: number,
    campsiteId?: number,
    userId?: string
}

export type Want = {
    id?: number,
    campsiteId?: number,
    userId?: string
}

export type Book = {
    id?: number,
    planId?: number,
    userId?: string,
    planTitle?: string,
    planImage?: string,
    planCheckIn?: string,
    planCheckOut?: string,
    planPrice?: string,
    planAC?: string,
    planPet?: string,
    planCapicity?: string
}

export interface CampsiteCardProps {
    campsite: Campsite,
}

export interface StarRateProps {
    starNumb: number
}

export interface TypeCardProps {
    type: Type
}