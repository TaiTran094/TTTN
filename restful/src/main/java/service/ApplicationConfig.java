/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import java.util.Set;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import support.CORSResponseFilter;

/**
 *
 * @author Luan
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {
    
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        resources.add(CORSResponseFilter.class);
        resources.add(RolesAllowedDynamicFeature.class);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(service.AdminUserFacadeREST.class);
        resources.add(service.AuthenticationEndpoint.class);
        resources.add(service.AuthenticationFilter.class);
        resources.add(service.CommentFacadeREST.class);
        resources.add(service.DivisionUserFacadeREST.class);
        resources.add(service.GuestUserFacadeREST.class);
        resources.add(service.NormalUserFacadeREST.class);
        resources.add(service.OfficeFacadeREST.class);
        resources.add(service.OfficialUserFacadeREST.class);
        resources.add(service.RequestFacadeREST.class);
        resources.add(service.UserFacadeREST.class);
        resources.add(service.VicePresidentUserFacadeREST.class);
        resources.add(service.service.AnnoucementFacadeREST.class);
    }
    
}
