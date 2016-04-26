/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import entity.User;
import io.jsonwebtoken.Claims;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import javax.annotation.Priority;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
/**
 *
 * @author TranVanTai
 */

@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {
    @PersistenceContext(unitName = "open311")
    private EntityManager em;
    
    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException{
        //Get HTTP header from the request
        String authourizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
        
        if(authourizationHeader == null || !authourizationHeader.startsWith("Bearer")){
            throw new NotAuthorizedException("Authorize header must be provided");
        }
        
        //Extract the token 
        String token = authourizationHeader.substring("Bearer".length()).trim();
        System.out.println("Bearer: " + token);
        
        try{
            validateToken(token);
        }
        catch(Exception e){
            requestContext.abortWith(
                Response.status(Response.Status.UNAUTHORIZED).build());
        }
    }

    private void validateToken(String token) throws Exception {     
        JWT jwt = new JWT();
    
        //Check if token exists in database 
        Query q = em.createQuery("SELECT u FROM User u WHERE u.token=:token");
        q.setParameter("token", token);
        List<User> users = q.getResultList();
        
        if(users.isEmpty()){
            throw new Exception();
        }
        
        //Check if token expired
        Claims claim = jwt.parseJWT(token);
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(now.after(claim.getExpiration())) throw new Exception();
    }
}
