import {SetMetadata} from '@nestjs/common';
import {ROLES} from '@prisma/client';
import {ROLES_KEY} from 'src/auth/decorators/key-decorator';

export const Roles = (...roles: Array<keyof typeof ROLES>) =>
	SetMetadata(ROLES_KEY, roles);
