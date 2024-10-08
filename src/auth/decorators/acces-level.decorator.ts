import {SetMetadata} from '@nestjs/common';
import {ACCES_LEVEL} from '@prisma/client';
import {ACCES_LEVEL_KEY} from 'src/auth/decorators/key-decorator';

export const AccessLevel = (...acceso: Array<keyof typeof ACCES_LEVEL>) =>
	SetMetadata(ACCES_LEVEL_KEY, acceso);
