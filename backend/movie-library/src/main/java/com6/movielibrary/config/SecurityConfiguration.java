package com6.movielibrary.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disable Cross Site Request Forgery
        http.csrf().disable();

        http.authorizeRequests(configurer ->
                configurer.antMatchers("/api/movies/secure/**")
                        .authenticated())
                .oauth2ResourceServer()
                .jwt();

        // ADD CORS FILTERS
        http.cors();

        // ADD CONTENT NEGOTIATION STRATEGY
        http.setSharedObject(ContentNegotiationStrategy.class,
                new HeaderContentNegotiationStrategy());

        // FORCE NON-EMPTY RESPONSE FOR 401
        Okta.configureResourceServer401ResponseBody(http);


        return http.build();
    }
}
