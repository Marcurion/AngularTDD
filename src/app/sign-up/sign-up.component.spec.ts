import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign Up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });
  
    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="username"]');
      const input = signUp.querySelector('input[id="username"]');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(label?.textContent).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="email"]');
      const input = signUp.querySelector('input[id="email"]');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(label?.textContent).toContain('E-mail');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="password"]');
      const input = signUp.querySelector('input[id="password"]');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;

      const input = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      expect(input.type).toBe('password');
      
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const label = signUp.querySelector('label[for="passwordRepeat"]');
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      expect(label).toBeTruthy();
      expect(input).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;

      const input = signUp.querySelector('input[id="passwordRepeat"]') as HTMLInputElement;
      expect(input.type).toBe('password');
      
    });

    it('has Sign Up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent).toBe('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });


  });

  describe('Functionality', () => {

    it('enabels the button when the password and password repeat fields have the same value', ()=> {

      const signUp = fixture.nativeElement as HTMLElement;
      const passwordInput = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector('input[id="passwordRepeat"]')  as HTMLInputElement;
      passwordInput.value = "P4ssword";
      passwordInput.dispatchEvent(new Event('input'));
      passwordRepeatInput.value = "P4ssword";
      passwordRepeatInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email and password to backend after clicking the button', ()=> {
      let httpTestingController = TestBed.inject(HttpTestingController);


      const signUp = fixture.nativeElement as HTMLElement;
      const usernameInput = signUp.querySelector('input[id="username"]') as HTMLInputElement;
      const emailInput = signUp.querySelector('input[id="email"]') as HTMLInputElement;
      const passwordInput = signUp.querySelector('input[id="password"]') as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector('input[id="passwordRepeat"]')  as HTMLInputElement;
      usernameInput.value = "user1";
      usernameInput.dispatchEvent(new Event('input'));
      emailInput.value = "user1@gmail.com";
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = "P4ssword";
      passwordInput.dispatchEvent(new Event('input'));
      passwordRepeatInput.value = "P4ssword";
      passwordRepeatInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      const button = signUp.querySelector('button');
      button?.click();
      const req = httpTestingController.expectOne("/api/1.0/users");
      const requestBody = req.request.body;
      expect(requestBody).toEqual({
        username: "user1",
        password: "P4ssword",
        email: "user1@gmail.com"
      })
    });

  });
});

// import { render, screen } from "@testing-library/angular";
// import { SignUpComponent } from "./sign-up.component";

// it('has Sign Up header', async () => {
//   await render(SignUpComponent);
//   const header = screen.getByRole('heading', { name: 'Sign Up' });
//   expect(header).toBeTruthy();
// });