package com.service.application_service.security;

import com.service.application_service.jwt.JwtTokenFilter;
import com.service.application_service.jwt.JwtTokenVeryfication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.cors.CorsUtils;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class ApplicationServiceSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordConfig passwordEncoder;

    private final UserDetailsService userDetailsService;

    public ApplicationServiceSecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.cors().and().csrf().disable().authorizeRequests().anyRequest().permitAll();
//                http.cors().and()
//                        .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .addFilter(new JwtTokenFilter(authenticationManager()))
//                .authorizeRequests()
//                .antMatchers("/js/**", "/css/**", "/img/**").permitAll()
//                .antMatchers("/**").permitAll()
////                .antMatchers("/admin/**").hasRole(UserRole.ADMIN.name())
//                .anyRequest()
//                .authenticated();
        http
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtTokenFilter(authenticationManagerBean()))
                .addFilterAfter(new JwtTokenVeryfication(), JwtTokenFilter.class)
                .authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/register/**").permitAll()
                .antMatchers(HttpMethod.POST, "/forgot/**").permitAll()
                .antMatchers(HttpMethod.POST, "/reset/**").permitAll()
                .anyRequest().permitAll();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception{
        return super.authenticationManagerBean();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder.passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

}
