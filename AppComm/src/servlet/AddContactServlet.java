package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import common.UserModel;
import ejb_interfaces.MessageReceiverSyncLocal;
import ejb_interfaces.MessageSenderLocal;

/**
 * Servlet implementation class AddContactServlet
 */
@WebServlet("/AddContactServlet")
public class AddContactServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@EJB
	MessageSenderLocal sender;
	
	@EJB
	MessageReceiverSyncLocal receiver;
	  
	JSONObject jsonToSend=null;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddContactServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
      response.setContentType("application/json");
		System.out.println("dans la get de la servlet !!");
		 PrintWriter out = response.getWriter();
//		 response.setCharacterEncoding(jsonToSend.toString());
	     out.println(jsonToSend.toString());
	     out.flush();
	     out.close();
//		if(jsonToSend!=null){
//			
//		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String jsonString = IOUtils.toString(request.getInputStream());
		System.out.println("(Servlet) Request string " + jsonString);
		
		JSONObject jsonReceive = (JSONObject) JSONValue.parse(jsonString);
		System.out.println(jsonString);
		UserModel user = new UserModel("", "", "", "", false);
		
		// Handle Request string of JSON type  "{param:value, param2:value2}" and of classic type "param=value&param2=value2"
		if(jsonReceive == null)
			user = getUserFromRequest(jsonString);
		else{
			String login = (String) jsonReceive.get("login");
			user.setLogin(login);
			user.setPwd(null);
			user.setNom(null);
			user.setPrenom(null);
			user.setIsCreate(true);

			if("".equals(user.getLogin())){
				user = null;
			}
		}
		
        JSONObject jsonToSend = new JSONObject();
        if (user != null){
        	user.setIsCreate(true);
            System.out.println("(Servlet) User from request: " + user.toString());
			sender.sendMessage(user);
    		UserModel userR = receiver.receiveMessage();
    		System.out.println("(Servlet) Receiving msg: " + userR);
    		if(userR != null){
    			jsonToSend.put("login", userR.getLogin());
    			jsonToSend.put("nom", userR.getNom());
    			jsonToSend.put("prenom", userR.getPrenom());
    			jsonToSend.put("validUser", true);
            	jsonToSend.put("isCreate", userR.getIsCreate());
            	
            }
    		else{
    			jsonToSend = makeDefaultResponse();

    		}
        }
        else{
			jsonToSend = makeDefaultResponse();
        }
        
        System.out.println("(Servlet) JSON To Send: " + jsonToSend);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/html");
        

        
        PrintWriter out = response.getWriter();
        out.println(jsonToSend.toString());
        out.close();
            
}
private UserModel getUserFromRequest(String req){

	UserModel user = new UserModel("", "", "", "", false);

	String[] param = req.split("=");

	if("login".equals(param[0])){
			user.setLogin(param[1]);
			user.setPwd(null);
			user.setNom(null);
			user.setPrenom(null);
	}
	
	System.out.println("dans le getUserFromRequest fin login:"+ user.getLogin());
	if("".equals(user.getLogin())){
		return null;
	}
	
	return user;
}
private JSONObject makeDefaultResponse(){
    JSONObject jsonToSend = new JSONObject();
    jsonToSend.put("login", "");
    jsonToSend.put("nom", "");
    jsonToSend.put("prenom", "");
	jsonToSend.put("validUser", false);
	jsonToSend.put("isCreate", false);
	return jsonToSend;
}

}
