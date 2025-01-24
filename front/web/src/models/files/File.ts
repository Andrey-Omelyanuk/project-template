import { Model, model, field } from 'mobx-orm'
import { api } from '@/services/http-adapter'
import { FileVersion } from './FileVersion'


export enum FileType {
    UNKNOWN = 0,
    IMAGE   = 1,
    AUDIO   = 2,
    VIDEO   = 3 
}

export enum VideoQuality {
    HD      = '1080p',
    HIGH    = '720p',
    MEDIUM  = '360p',
    LOW     = '240p',
}

@api('file')
@model
export class File extends Model {
    @field title          ?: string
    @field description    ?: string
    @field uploaded_by_id ?: number
    @field uploaded_at    ?: string
    @field type           ?: FileType
    @field file           ?: string

    readonly versions: FileVersion[]

    getVersionBySlug(slug: string) {
        return this.versions.find(version => version.slug === slug)
    }

    // Return ordered list of available qualities and links
    // Note: slug is the value of VideoQuality enum
    getAvailableQualities(addOriginal: boolean = false) : {slug: string, link: string}[] {
        const qualityList = [] 
        if (this.type !== FileType.VIDEO) {
            console.error('File is not a video')
        } 
        else {
            for (const version of this.versions) {
                qualityList.push({slug: version.slug, link: version.file})
            }
            qualityList.sort((a, b) => a.slug.localeCompare(b.slug))
            if (addOriginal) {
                qualityList.unshift({slug: 'original', link: this.file, })
            }
        }
        return qualityList
    }

    getThumbnail() : FileVersion {
        return this.versions.find(version => version.slug === 'thumbnail')
    }
    getPreview() : FileVersion {
        return this.versions.find(version => version.slug === 'preview')
    }
}
