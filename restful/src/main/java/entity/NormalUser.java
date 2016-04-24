/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Luan
 */
@Entity
@Table(name="normal_user")
@DiscriminatorValue("normal")
@XmlRootElement
public class NormalUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;
    
    @Size(min = 1, max = 20)
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;
    
    @Size(min = 1, max = 40)
    @Column(name = "identify_card", nullable = false)
    private String indentifyCard;

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getIndentifyCard() {
        return indentifyCard;
    }

    public void setIndentifyCard(String indentifyCard) {
        this.indentifyCard = indentifyCard;
    }
}
