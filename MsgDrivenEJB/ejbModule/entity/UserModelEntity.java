package entity;

import java.io.Serializable;
import java.lang.String;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

/**
 * Entity implementation class for Entity: UserModelEntity
 *
 */
@Entity
@Table(name="users")
public class UserModelEntity implements Serializable {

//	private int id;
	
	@Id
	private String login;
	
	@NotNull
	private String pwd;
	private String prenom;
	private String nom;
	private Boolean isCreate;
	
	private static final long serialVersionUID = 1L;

	public UserModelEntity(){
		super();
	}   

	public String getLogin() {
		return this.login;
	}

	public void setLogin(String login) {
		this.login = login;
	}   
	public String getPwd() {
		return this.pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}   
	public String getPrenom() {
		return this.prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}   
	public String getNom() {
		return this.nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}   
	
	public void setUserData(String log, String pass, String p, String n, Boolean isCreate){
		this.login = log;
		this.pwd = pass;
		this.prenom = p;
		this.nom = n;
		this.isCreate = isCreate;
	}
   
	public String toString(){
		return "UserModelEntity [login=" + login + ", pwd=" + pwd + ", nom=" + nom
				+ ", prenom=" + prenom + ", isCreate=" + isCreate + "]";
	}
	public Boolean getIsCreate() {
		return isCreate;
	}
	public void setIsCreate(Boolean isCreate) {
		this.isCreate = isCreate;
	}
}
