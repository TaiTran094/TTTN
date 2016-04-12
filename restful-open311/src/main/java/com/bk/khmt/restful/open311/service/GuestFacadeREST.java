/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.bk.khmt.restful.open311.service;

import com.bk.khmt.restful.open311.Guest;
import java.util.List;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Luan
 */
@Stateless
@Path("com.bk.khmt.restful.open311.guest")
public class GuestFacadeREST extends AbstractFacade<Guest> {

    @PersistenceContext(unitName = "com.bk.khmt_restful-open311_war_1.0-SNAPSHOTPU")
    private EntityManager em;

    public GuestFacadeREST() {
        super(Guest.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void create(Guest entity) {
        super.create(entity);
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Guest entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Guest find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Guest> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public List<Guest> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }

    @GET
    @Path("/checkLoginGuest")
    @Produces(MediaType.APPLICATION_JSON)
    public Guest checkLoginGuest(@QueryParam("displayName") String displayName, @QueryParam("email") String email){
        System.out.print(displayName);
        Query query = em.createQuery("Select g FROM Guest g WHERE g.guestName = :displayName and g.guestEmail = :email");
        query.setParameter("displayName", displayName);
        query.setParameter("email", email);
        List<Guest> guests = query.getResultList();
        
        if(!guests.isEmpty()){
            return guests.get(0);
        }
        else return null;
    }
    
    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
