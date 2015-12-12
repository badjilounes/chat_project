package entity;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="Dali", date="2015-12-12T16:06:12.004+0100")
@StaticMetamodel(UserModelEntity.class)
public class UserModelEntity_ {
	public static volatile SingularAttribute<UserModelEntity, String> login;
	public static volatile SingularAttribute<UserModelEntity, String> pwd;
	public static volatile SingularAttribute<UserModelEntity, String> prenom;
	public static volatile SingularAttribute<UserModelEntity, String> nom;
	public static volatile SingularAttribute<UserModelEntity, Boolean> isCreate;
}
