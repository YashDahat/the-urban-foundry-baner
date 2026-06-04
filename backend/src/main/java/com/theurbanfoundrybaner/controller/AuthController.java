package com.theurbanfoundrybaner.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.theurbanfoundrybaner.dto.AuthRequest;
import com.theurbanfoundrybaner.dto.AuthResponse;
import com.theurbanfoundrybaner.service.UserService;
import com.theurbanfoundrybaner.util.JwtUtil;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );

        UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmail());
        String jwt = jwtUtil.generateToken(userDetails);

        String role = userDetails.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

        long expiresAt = jwtUtil.getExpirationDateFromToken(jwt).getTime();

        AuthResponse authResponse = new AuthResponse(jwt, role, expiresAt);
        return ResponseEntity.ok(authResponse);
    }
}