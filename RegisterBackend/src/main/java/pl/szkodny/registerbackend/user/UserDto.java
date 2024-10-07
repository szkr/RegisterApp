package pl.szkodny.registerbackend.user;


import org.hibernate.validator.constraints.Length;
import pl.szkodny.registerbackend.user.password.ValidPassword;

public record UserDto(@Length(min = 5, max = 30) String username, @ValidPassword String password) {
}
