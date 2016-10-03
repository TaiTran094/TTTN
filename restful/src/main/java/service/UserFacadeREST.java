/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import dto.GeneralUser;
import entity.DivisionUser;
import entity.NormalUser;
import entity.OfficialUser;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Luan
 */

@Stateless
@Path("entity.user")
@PermitAll
public class UserFacadeREST extends AbstractFacade<User> {

    @PersistenceContext(unitName = "open311")
    private EntityManager em;

    public UserFacadeREST() {
        super(User.class);
    }

    @POST
    @Override
    @Consumes(MediaType.APPLICATION_JSON)
    public void create(User entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void edit(@PathParam("id") Integer id, User entity) {
        //TO DO: Update entity role
        Query query = em.createQuery("UPDATE User SET user_type =:userType WHERE id=:id");
        query.setParameter("userType", entity.getUserType());
        query.setParameter("id", entity.getId());
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }
   
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public User find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("normal")
    public List<GeneralUser> getAllUser() {
        List<GeneralUser> generalUsers = new ArrayList<>();
        Query q = em.createQuery("SELECT u FROM NormalUser u");
        List<NormalUser> normalUsers = q.getResultList();
        q = em.createQuery("SELECT d FROM DivisionUser d");
        List<DivisionUser> divisionUsers = q.getResultList();   
        q = em.createQuery("SELECT o FROM OfficialUser o");
        List<OfficialUser> officialUsers = q.getResultList();         
        for(NormalUser u: normalUsers) {
            GeneralUser g = new GeneralUser();
            g.setEmail(u.getEmail());
            g.setId(u.getId());
            g.setIdentifyCard(u.getIdentifyCard());
            g.setName(u.getName());
            g.setPassWord(u.getPassWord());
            g.setPhoneNumber(u.getPhoneNumber());
            g.setToken(u.getToken());
            
               
                            
            g.setUserType(u.getUserType());
            System.out.println("========USER TYPE========" + u.getUserType());
            generalUsers.add(g);
        }
        for(DivisionUser d: divisionUsers) {
            GeneralUser g = new GeneralUser();
            g.setEmail(d.getEmail());
            g.setId(d.getId());
            g.setName(d.getName());
            g.setPassWord(d.getPassWord());
            g.setToken(d.getToken());
            g.setUserType(d.getUserType());
            generalUsers.add(g);
        }
        for(OfficialUser d: officialUsers) {
            GeneralUser g = new GeneralUser();
            g.setEmail(d.getEmail());
            g.setId(d.getId());
            g.setName(d.getName());
            g.setPassWord(d.getPassWord());
            g.setToken(d.getToken());
            g.setUserType(d.getUserType());
            generalUsers.add(g);
        }        
        return generalUsers;
    }

    @GET
    @Path("{from}/{to}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
