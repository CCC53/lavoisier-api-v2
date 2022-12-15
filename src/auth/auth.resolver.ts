import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './types/auth.response';
import { SignUpInput, SigninInput } from './dto/inputs/index';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signup(@Args('record', { type: () => SignUpInput }) record: SignUpInput) {
    return this.authService.signup(record);
  }

  @Mutation(() => AuthResponse)
  signin(@Args('record', { type: () => SigninInput }) record: SigninInput) {
    return this.authService.signin(record);
  }
}
