
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UserType = process.env.NEXT_PUBLIC_USER_TYPE;
let entryPage = '/';

if(UserType === 'admin'){
    entryPage = '/auth/admin/login';
} else if(UserType === 'lecturer'){
    entryPage = '/auth/lecturer/login';
} else if(UserType === 'student'){
    entryPage = '/auth/student/login';
}

export default {
    webpack(config){
        config.resolve.alias['@'] = path.join(__dirname, 'app');
        return config;
    },
    async redirects(){
        return [
            {
                source: '/',
                destination: entryPage,
                permanent: false,
            }
        ]
    }
}