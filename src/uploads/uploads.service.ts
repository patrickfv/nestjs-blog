import { Injectable } from '@nestjs/common';
import { S3Client,  PutObjectAclCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto'

const S3_ENDPOINT = 'https://objstorage.leapcell.io'
const S3_ACCESS_KEY_ID = 'c309ed98de6b4bc98f989ce85a6e384f'
const S3_SECRET_ACCESS_KEY = '4acb006895388fd98bd28a530f85407984e659dd965b1f3f91a33e7abe439443'
const S3_BUCKET_NAME = 'personalblog-mdlm-4dua-ypqflxqb'
const S3_PUBLIC_URL = 'https://3mwvmd.leapcellobj.com/personalblog-mdlm-4dua-ypqflxqb'
const REGION = 'us-east-1'

@Injectable()
export class UploadsService {
    private readonly s3: S3Client

    constructor() {
        this.s3 = new S3Client( {
            endpoint: S3_ENDPOINT,
            region: REGION,
            credentials: {
                accessKeyId: S3_ACCESS_KEY_ID,
                secretAccessKey: S3_SECRET_ACCESS_KEY
            }
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const uniqueFileName = `${crypto.randomUUID()}-${file.originalname}`
        const command = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: uniqueFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        })

        try {
            await this.s3.send(command)
            return `${S3_PUBLIC_URL}/${uniqueFileName}`
        } catch (err) {
            console.error('Error uploading to S3: ', err)
            throw new Error('File upload failed.')
        }
    }
}
