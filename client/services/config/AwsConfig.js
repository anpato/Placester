import {
	BUCKETNAME,
	DIRNAME,
	ACCESSKEYID,
	SECRETACCESSKEY,
	REGION
} from 'react-native-dotenv'
export const awsConfig = (folder) => {
	const config = {
		bucketName: BUCKETNAME,
		dirName: folder /* optional */,
		region: REGION,
		accessKeyId: ACCESSKEYID,
		secretAccessKey: SECRETACCESSKEY
	}
	return config
}
