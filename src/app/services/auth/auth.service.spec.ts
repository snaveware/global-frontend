import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import { RouterTestingModule } from '@angular/router/testing';


import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
