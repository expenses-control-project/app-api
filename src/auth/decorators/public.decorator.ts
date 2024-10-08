import {SetMetadata} from '@nestjs/common';
import {PUBLIC_KEY} from 'src/auth/decorators/key-decorator';

export const PublicAcces = () => SetMetadata(PUBLIC_KEY, true);
