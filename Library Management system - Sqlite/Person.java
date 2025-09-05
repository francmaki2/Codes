import java.sql.*;

public class Person {

    String personName;
    String personField;
    String personID;

    public Person(){
        //contrstrcutor
    }
    
    public Person(String personName, String personField) {
        this.personName = personName;
        this.personField = personField;
        }
        


    //Method for adding Person
    public void setPerson(String personName, String personField)throws SQLException {
        String url = "jdbc:sqlite:PersonTable.db";
        String insertOrUpdateSQL = """
            INSERT INTO Person (PersonName, PersonField) VALUES (?, ?)
        """;

        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement pstmt = conn.prepareStatement(insertOrUpdateSQL)) {

            pstmt.setString(1, personName);
            pstmt.setString(2, personField);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error adding person: " + e.getMessage());
        }
    }




    //Method for removing Person
    public void removePerson(String personID) throws SQLException {
        String url = "jdbc:sqlite:PersonTable.db";
        String deleteSQL = "DELETE FROM Person WHERE PersonId = ?";
    
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {
    
            pstmt.setString(1, personID); // Set the ISBN of the book to remove
    
            int rowsAffected = pstmt.executeUpdate(); // Execute the delete statement
        } catch (SQLException e) {
        }
    }

}








