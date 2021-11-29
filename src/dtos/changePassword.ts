import { string } from 'yup/lib/locale'

export interface ChangePasswordDto {
    password: string
    token: string
}
