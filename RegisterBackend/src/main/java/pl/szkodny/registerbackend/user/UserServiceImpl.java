package pl.szkodny.registerbackend.user;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void registerUser(UserDto userDto) {

        User user = new User();
        user.setPassword(userDto.password());
        user.setUsername(userDto.username());

        if(userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException();
        }
        userRepository.save(user);
    }
}
