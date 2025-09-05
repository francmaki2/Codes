import java.sql.*;

import javax.swing.JOptionPane;

public class LibraryItem {

    private static final String BOOK_DB_URL = "jdbc:sqlite:BookTable.db";
    private static final String PERSON_DB_URL = "jdbc:sqlite:PersonTable.db";
    private static final String BORROWED_BOOKS_DB_URL = "jdbc:sqlite:BorrowedBooks.db";

    public LibraryItem() {
        // Default constructor
    }



    // Method to borrow a book
    public static void borrowBook(int personId, String identifier, String identifierType) {
        // SQL to select book based on identifier
        String selectBookSql;
        switch (identifierType.toLowerCase()) {
            case "bookid":
                selectBookSql = "SELECT BookId, availableCopies FROM Books WHERE BookId = ?";
                break;
            case "title":
                selectBookSql = "SELECT BookId, availableCopies FROM Books WHERE title = ?";
                break;
            case "isbn":
                selectBookSql = "SELECT BookId, availableCopies FROM Books WHERE ISBN = ?";
                break;
            default:
                System.out.println("Invalid identifier type. Use 'bookid', 'title', or 'isbn'.");
                return;
        }
        
        // SQL to update available copies
        String updateBookSql = "UPDATE Books SET availableCopies = availableCopies - 1 WHERE BookId = ? AND availableCopies > 0";
        // SQL to insert into BorrowedBooks
        String insertBorrowedSql = "INSERT INTO BBooks (PersonId, BookId, BorrowDate) VALUES (?, ?, ?)";
   
        // Make sure you're connecting to the correct database for the books
        try (Connection conn = DriverManager.getConnection(BOOK_DB_URL)) {
            
            // Check if the book exists and is available
            try (PreparedStatement selectBookStmt = conn.prepareStatement(selectBookSql)) {
                selectBookStmt.setString(1, identifier);
                ResultSet rs = selectBookStmt.executeQuery();
                
                if (!rs.next()) {
                    JOptionPane.showMessageDialog(null, "No book found with the provided identifier or Value.", "Success", JOptionPane.INFORMATION_MESSAGE);

                    return;
                }
    
                int bookId = rs.getInt("BookId");
                int availableCopies = rs.getInt("availableCopies");
    
                // Check if there are available copies
                if (availableCopies <= 0) {
                    JOptionPane.showMessageDialog(null, "Book is unavailable for borrowing.", "Success", JOptionPane.INFORMATION_MESSAGE);

                    return;
                }
    
                // Update availableCopies in Books
                try (PreparedStatement updateBookStmt = conn.prepareStatement(updateBookSql)) {
                    updateBookStmt.setInt(1, bookId);
                    int updatedRows = updateBookStmt.executeUpdate();
    
                    if (updatedRows == 0) {
                        JOptionPane.showMessageDialog(null, "Failed to update book availability.", "Success", JOptionPane.INFORMATION_MESSAGE);
                        return;
                    }
                }
    
                // Insert into BorrowedBooks (Ensure using BORROWED_BOOKS_DB_URL for this)
                try (Connection borrowedConn = DriverManager.getConnection(BORROWED_BOOKS_DB_URL);
                     PreparedStatement insertBorrowedStmt = borrowedConn.prepareStatement(insertBorrowedSql)) {
   
                    insertBorrowedStmt.setInt(1, personId);
                    insertBorrowedStmt.setInt(2, bookId);
                    insertBorrowedStmt.setString(3, java.time.LocalDate.now().toString()); // Current date
                    insertBorrowedStmt.executeUpdate();
                    
                    JOptionPane.showMessageDialog(null, "Book successfully Borrowed!", "Success", JOptionPane.INFORMATION_MESSAGE);
                }
    
            } catch (SQLException e) {
                System.out.println("Error checking or updating book details: " + e.getMessage());
            }
    
        } catch (SQLException e) {
            System.out.println("Error connecting to the database: " + e.getMessage());
        }
    }
    



    // Method to return a book
public static void returnBook(int borrowId) {
    // SQL queries
    String getBookIdSql = "SELECT BookId FROM BBooks WHERE BorrowId = ?";
    String updateBookCopiesSql = "UPDATE Books SET availableCopies = availableCopies + 1 WHERE BookId = ?";
    String updateBorrowedSql = "UPDATE BBooks SET ReturnDate = ? WHERE BorrowId = ?";

    // Step 1: Retrieve BookId from BBooks
    try (Connection borrowedConn = DriverManager.getConnection(BORROWED_BOOKS_DB_URL);
         PreparedStatement getBookIdStmt = borrowedConn.prepareStatement(getBookIdSql)) {

        int bookId = -1;

        getBookIdStmt.setInt(1, borrowId);
        try (ResultSet rs = getBookIdStmt.executeQuery()) {
            if (rs.next()) {
                bookId = rs.getInt("BookId");
            } else {
                System.out.println("Error: No BorrowId found in BBooks.");
                return;
            }
        }

        // Step 2: Update availableCopies in Books
        try (Connection booksConn = DriverManager.getConnection(BOOK_DB_URL);
             PreparedStatement updateBookStmt = booksConn.prepareStatement(updateBookCopiesSql)) {

            updateBookStmt.setInt(1, bookId);
            int rowsAffected = updateBookStmt.executeUpdate();

            if (rowsAffected == 0) {
                System.out.println("Error: No matching BookId in Books. Update failed.");
                return;
            }
        }

        // Step 3: Update ReturnDate in BBooks
        try (PreparedStatement updateBorrowedStmt = borrowedConn.prepareStatement(updateBorrowedSql)) {
            updateBorrowedStmt.setString(1, java.time.LocalDate.now().toString()); // Current date
            updateBorrowedStmt.setInt(2, borrowId);
            updateBorrowedStmt.executeUpdate();
        }

        JOptionPane.showMessageDialog(null, "Book successfully Returend!", "Success", JOptionPane.INFORMATION_MESSAGE);


    } catch (SQLException e) {
        System.out.println("Error during book return: " + e.getMessage());
    }
}


}