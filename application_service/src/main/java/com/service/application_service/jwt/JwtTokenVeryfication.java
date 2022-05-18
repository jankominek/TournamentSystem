package com.service.application_service.jwt;

import com.google.common.base.Strings;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class JwtTokenVeryfication extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if(Strings.isNullOrEmpty(authHeader) || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        try{
            String token = authHeader.replace("Bearer ", "");
            String key = "wCpITSecureKeywCpITSecureKeywCpITSecureKey";
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
                    .build()
                    .parseClaimsJws(token);
            Claims body = claims.getBody();

            String bodySubject = body.getSubject();

            List<Map<String, String>> autorities = (List<Map<String, String>>) body.get("authorities");

            Set<SimpleGrantedAuthority> simpleGrantedAuthoritySet = autorities.stream().map((authority)-> new SimpleGrantedAuthority(authority.get("authority")))
                    .collect(Collectors.toSet());

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    bodySubject,
                    null,
                    simpleGrantedAuthoritySet
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);


        }catch (JwtException e){
            throw new IllegalStateException("Untrusted token");
        }

        filterChain.doFilter(request, response);
    }
}
