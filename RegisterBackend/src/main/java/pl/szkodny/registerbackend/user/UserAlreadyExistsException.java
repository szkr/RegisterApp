package pl.szkodny.registerbackend.user;


public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        super("This username is already taken");
    }
}
