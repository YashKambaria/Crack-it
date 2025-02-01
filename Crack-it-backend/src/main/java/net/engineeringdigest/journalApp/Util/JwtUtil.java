package net.engineeringdigest.journalApp.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
	
	private static String SECRET_KEY="jai#928i3kfio$RWrfe94jfR$efTETWRH^TSTGSDERre";
	public static String generateToken(String username){
		Map<String ,Object> claims=new HashMap<>();
		return createToken(claims,username);
	}
	
	
	private static String createToken(Map<String, Object> claims, String username) {
		String token=Jwts.builder()
				.claims(claims)
				.subject(username)
				.header().empty().add("typ","JWT")
				.and()
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+1000*100))
				.signWith(getSigningKey())
				.compact();
		System.out.println(token);
		return token;
	}
	
	public static String extractUsername(String token) {
		Claims claims = extractAllClaims(token);
		return claims.getSubject();
	}
	private static SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}
	public static Boolean validateToken(String token){
		return !isTokenExpired(token);
	}
	
	private static boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	private static Date extractExpiration(String token) {
		return extractAllClaims(token).getExpiration();
	}
	private static Claims extractAllClaims(String token) {
		return Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
}
