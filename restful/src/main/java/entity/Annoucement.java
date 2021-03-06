/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import javax.annotation.security.PermitAll;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Luan
 */

@Entity(name="Annoucement")
@Table(name = "annoucement")
@XmlRootElement
public class Annoucement implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "title", nullable = false)
    private String title;
    
    @NotNull
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @NotNull
    @Column(name = "time", nullable = false, columnDefinition="TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date time;

    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "type", nullable = false)
    private String type;
    
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}