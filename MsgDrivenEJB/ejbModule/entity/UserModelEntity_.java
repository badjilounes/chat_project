package entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2015-12-08T20:11:56.366+0100")
@StaticMetamodel(UserModelEntity.class)
public class UserModelEntity_ {
	public static volatile SingularAttribute<UserModelEntity, String> login;
	public static volatile SingularAttribute<UserModelEntity, String> pwd;
	public static volatile SingularAttribute<UserModelEntity, String> prenom;
	public static volatile SingularAttribute<UserModelEntity, String> nom;
	public static volatile SingularAttribute<UserModelEntity, String> role;
}
