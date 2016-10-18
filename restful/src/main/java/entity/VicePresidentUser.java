package entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author TranVanTai
 */

@Entity
@Table(name = "vice_president_user")
@DiscriminatorValue("vice_president")

@XmlRootElement
public class VicePresidentUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;

    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    
}
