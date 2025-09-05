import java.sql.*;

public class Book {

    String title;
    String author;
    String ISBN;
    String publicationDate;
    String availableCopies;

    public Book(){
        //contrsurcesdf
    }
    public Book(String title, String author, String ISBN, String publicationDate, String availableCopies) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.publicationDate = publicationDate;
        this.availableCopies = availableCopies;}
        


    //Method for adding books
    public void setBook(String title, String author, String ISBN, String publicationDate, String availableCopies)throws SQLException {
        int NumCopies = Integer.parseInt(availableCopies);
        String url = "jdbc:sqlite:BookTable.db";
        String insertOrUpdateSQL = """
            INSERT INTO Books (title, author, ISBN, publicationDate, availableCopies)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(ISBN) DO UPDATE SET
                title = excluded.title,
                author = excluded.author,
                publicationDate = excluded.publicationDate,
                availableCopies = excluded.availableCopies;
        """;

        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement pstmt = conn.prepareStatement(insertOrUpdateSQL)) {

            pstmt.setString(1, title);
            pstmt.setString(2, author);
            pstmt.setString(3, ISBN);
            pstmt.setString(4, publicationDate);
            pstmt.setInt(5, NumCopies);

            pstmt.executeUpdate();
        } catch (SQLException e) {
        }
    }

    //Method for removing books
    public void removeBook(String ISBN) throws SQLException {
        String url = "jdbc:sqlite:BookTable.db";
        String deleteSQL = "DELETE FROM Books WHERE ISBN = ?";
    
        try (Connection conn = DriverManager.getConnection(url);
             PreparedStatement pstmt = conn.prepareStatement(deleteSQL)) {
    
            pstmt.setString(1, ISBN); // Set the ISBN of the book to remove
    
            int rowsAffected = pstmt.executeUpdate(); // Execute the delete statement
        } catch (SQLException e) {
        }
    }

}








