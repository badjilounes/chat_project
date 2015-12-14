package servlet;

import java.io.IOException;

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
 * Servlet implementation class SignServlet
 */
@WebServlet("/Sign")
public class SignServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@EJB
	MessageSenderLocal sender;
	
	@EJB
	MessageReceiverSyncLocal receiver;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.sendRedirect("signup.html");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		 String jsonString = IOUtils.toString(request.getInputStream());
		 System.out.println("(Servlet) Request string " + jsonString);
			
		 JSONObject jsonReceive = (JSONObject) JSONValue.parse(jsonString);
		 UserModel user = new UserModel("", "", "", "", false);
		
			// Handle Request string of JSON type  "{param:value, param2:value2}" and of classic type "param=value&param2=value2"
			if(jsonReceive == null)
				user = getUserFromRequest(jsonString);
			else{
				String login = (String) jsonReceive.get("login");
				user.setLogin(login);
				String pwd = (String) jsonReceive.get("pwd");
				user.setPwd(pwd);
				String nom = (String) jsonReceive.get("nom");
				user.setNom(nom);
				String prenom = (String) jsonReceive.get("prenom");
				user.setPrenom(prenom);
				user.setIsCreate(false);
				if("".equals(user.getLogin()) || "".equals(user.getPwd()) ||"".equals(user.getNom()) ||"".equals(user.getPrenom())){
					user = null;
				}
			}
			JSONObject jsonToSend = new JSONObject();
	        if (user != null){
	        	//Allows to subscribe into the database
	        	user.setIsCreate(false);
	            System.out.println("(Servlet) User from request: " + user.toString());
	        	sender.sendMessage(user);
	    		UserModel userR = receiver.receiveMessage();
	    		System.out.println("(Servlet) Receiving msg: " + userR);
	    		if(userR != null){
	    			jsonToSend.put("login", userR.getLogin());
	    			jsonToSend.put("pwd", userR.getPwd());
	    			jsonToSend.put("nom", userR.getNom());
	    			jsonToSend.put("prenom", userR.getPrenom());
	            	jsonToSend.put("isCreate", userR.getIsCreate());
	            }
	    		else{
	    			jsonToSend.put("isCreate", false);
	    			//afficher wrong password
	    		}
	        }
	        else{
	        	jsonToSend.put("isCreate", false);
	        }
	        
	        Boolean isValid = (Boolean)jsonToSend.get("isCreate");
	        if(isValid){
	        	response.setHeader("Access-Control-Allow-Origin", "*");
	            response.setContentType("text/html");
	            response.sendRedirect("index.html");
	        }
		
	}

	private UserModel getUserFromRequest(String req) {
		UserModel user = new UserModel("", "", "", "", false);
		if(req.contains("&")){
			String[] paramsplit = req.split("&");
			for(String params : paramsplit){
				String[] param = params.split("=");

				if("login".equals(param[0])){
					user.setLogin(param[1]);
				}
				else if("pwd".equals(param[0])){
					user.setPwd(param[1]);
				}
				else if("nom".equals(param[0])){
					user.setNom((param[1]));
				}
				else if("prenom".equals(param[0])){
					user.setPrenom((param[1]));
				}
			}
		}
		if("".equals(user.getLogin()) || "".equals(user.getPwd()) ||"".equals(user.getNom()) ||"".equals(user.getPrenom())){
			return null;
		}
		return user;
	}

}
