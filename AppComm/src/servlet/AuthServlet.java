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
 * Servlet implementation class WatcherAuthServlet
 */
@WebServlet("/Auth")
public class AuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@EJB
	MessageSenderLocal sender;
	
	@EJB
	MessageReceiverSyncLocal receiver;
	Boolean isValidAuth=false;
    public AuthServlet() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		

			response.setHeader("Access-Control-Allow-Origin", "*");
	        response.setContentType("application/json");
	        System.out.println("res: " + isValidAuth);
	        PrintWriter out = response.getWriter();
	        out.println(isValidAuth.toString());
	        out.flush();
	        out.close();

		
			

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
				user.setIsCreate(true);
				if("".equals(user.getLogin()) || "".equals(user.getPwd())){
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
	    			jsonToSend.put("validAuth", true);
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
	       
	        Boolean isValid = (Boolean)jsonToSend.get("validAuth");
	        
	        if(isValid){
	        	response.setHeader("Access-Control-Allow-Origin", "*");
	            response.setContentType("text/html");
	            response.sendRedirect("addContact.html");
	            
	        }
	        else{
	        	response.setHeader("Access-Control-Allow-Origin", "*");
	            response.setContentType("text/html");
	            response.sendRedirect("index.html");
	        }
	}
	private UserModel getUserFromRequest(String req){
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
			}
		}
		if("".equals(user.getLogin()) || "".equals(user.getPwd())){
			return null;
		}
		return user;
	}
	
	private JSONObject makeDefaultResponse(){
        JSONObject jsonToSend = new JSONObject();
        jsonToSend.put("login", "");
		jsonToSend.put("validAuth", false);
    	jsonToSend.put("isCreate", false);
    	return jsonToSend;
	}
	
}
