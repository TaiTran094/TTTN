package entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author TranVanTai
 */

@Entity
@Table(name = "division_user")
@DiscriminatorValue("division")
@NamedQueries({
    @NamedQuery(name = "DivisionUser.findByEmail", query = "SELECT u FROM DivisionUser u WHERE u.email=:email"),
    @NamedQuery(name = "DivisionUser.findByEmailAndPassword", query = "SELECT u FROM DivisionUser u WHERE u.email=:email AND u.passWord=:password"),
    @NamedQuery(name = "DivisionUser.findByToken", query = "SELECT u FROM DivisionUser u WHERE u.token=:token"),
})
public class DivisionUser extends User {
    
    @Size(min = 1, max = 40)
    @Column(name = "password", nullable = false)
    private String passWord;

    @JoinColumn(name = "division_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Division division;

    public Division getDivision() {
        return division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }
    
    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    
}
