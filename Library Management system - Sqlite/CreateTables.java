import java.sql.*;

public class CreateTables{

public static void CreateBookTable(){
        
    String url = "jdbc:sqlite:BookTable.db";
    String sql = """
        CREATE TABLE IF NOT EXISTS Books (
            BookId INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            ISBN TEXT NOT NULL UNIQUE,
            publicationDate TEXT NOT NULL,
            availableCopies INTEGER NOT NULL CHECK(availableCopies >= 0)
        );
    """;
    Connection conn = null;
try {
    conn = DriverManager.getConnection(url);
     Statement stmt = conn.createStatement();
    // create a new table
    stmt.execute(sql);
} catch (SQLException e) {
    System.out.println(e.getMessage());
}
}

public static void CreatePersonTable() {

    String url = "jdbc:sqlite:PersonTable.db"; // SQLite database file
    String sql = """
        CREATE TABLE IF NOT EXISTS Person (
            PersonId INTEGER PRIMARY KEY AUTOINCREMENT,
            PersonName TEXT NOT NULL,
            PersonField TEXT NOT NULL
        );
    """;

    try (Connection conn = DriverManager.getConnection(url);
         Statement stmt = conn.createStatement()) {
        // Execute the SQL statement to create the table
        stmt.execute(sql);
    } catch (SQLException e) {
        System.out.println("Error creating Person table: " + e.getMessage());
    }
}

public static void CreateBorrowedBooksTable() {
    String url = "jdbc:sqlite:BorrowedBooks.db"; // SQLite database file

    String sql = """
        CREATE TABLE IF NOT EXISTS BBooks (
            BorrowId INTEGER PRIMARY KEY AUTOINCREMENT,
            PersonId INTEGER NOT NULL,
            BookId INTEGER NOT NULL,
            BorrowDate TEXT NOT NULL,
            ReturnDate TEXT,
            FOREIGN KEY (PersonId) REFERENCES Person (PersonId) ON DELETE CASCADE,
            FOREIGN KEY (BookId) REFERENCES Books (BookId) ON DELETE CASCADE
        );
    """;

    try (Connection conn = DriverManager.getConnection(url);
         Statement stmt = conn.createStatement()) {
        stmt.execute(sql);
        System.out.println("BorrowedBooks table created successfully.");
    } catch (SQLException e) {
        System.out.println("Error creating BorrowedBooks table: " + e.getMessage());
    }

}
}