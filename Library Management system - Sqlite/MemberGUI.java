import java.awt.*;
import javax.swing.*;
import java.awt.event.*;

public class MemberGUI extends LibraryItem{
    private String userID;
    private JFrame frameA;
    private JPanel panelA, panelB,panelC,panelD,panelE,panelF,panelG,panelH;
    private JLabel labelA,labelB,labelC,labelD,labelE;
    private JTextField fieldA,fieldB,fieldC;

    public MemberGUI(String userID) {
        this.userID = userID;  // Store the userID
    }


    public void DisplayMem(){

        // MAIN FRAME
        frameA = new JFrame();
        frameA.setTitle("Member GUI");
        frameA.setSize(1200, 700);
        frameA.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        frameA.setLocationRelativeTo(null);
        frameA.setLayout(null);
        frameA.getContentPane().setBackground(Color.decode("#FCFBF4"));
        

//---------------------------DISPLAY BOOK SECTION----------------------------------------
        panelA = new JPanel();
        panelA.setBounds(110, 500, 200, 50);
        panelA.setLayout(new FlowLayout());
        panelA.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelA.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelA);

        JButton DispBookTable = new JButton("Display Books Table");
        DispBookTable.setFont(new Font("Arial", Font.BOLD, 16));

        // Action Listener to Display Books
        DispBookTable.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent x) {
                BookTableGUI.displayBookTable();
            }
        });
        panelA.add(DispBookTable);



//----------------------------------------BORROW BOOK SECTION--------------------------
        //BORROW BOOK LABELS
        panelB = new JPanel();
        panelB.setBounds(10, 80, 200, 250);
        panelB.setLayout(new BoxLayout(panelB, BoxLayout.PAGE_AXIS));
        panelB.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelB.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelB);

        labelA = new JLabel("Borrow Book:");
        labelA.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
        labelA.setForeground(Color.BLACK);
        panelB.add(labelA);

        panelB.add(Box.createRigidArea(new Dimension(10,15)));

        labelB = new JLabel(" Borrow using value: ");
        labelB.setFont(new Font("Arial", Font.PLAIN, 16));
        labelB.setForeground(Color.BLACK);
        panelB.add(labelB);

        panelB.add(Box.createRigidArea(new Dimension(10,15)));

        labelC = new JLabel("            Enter value: ");
        labelC.setFont(new Font("Arial", Font.PLAIN, 16));
        labelC.setForeground(Color.BLACK);
        panelB.add(labelC);



        //BORROW BOOK TEXT FIELD
        panelC = new JPanel();
        panelC.setBounds(180, 120, 200, 85);
        panelC.setLayout(new BoxLayout(panelC, BoxLayout.PAGE_AXIS));
        panelC.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelC.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelC);

        fieldA = createJTextField();
        fieldB = createJTextField();
        
        String placeholder ="Enter 'ISBN' or 'Title' or 'BookID'";
        fieldA.setText(placeholder);
        fieldA.setForeground(Color.gray);
        fieldA.addFocusListener(new FocusAdapter() {
            @Override
            public void focusGained(FocusEvent e) {   //set text placeholder
                if (fieldA.getText().equals(placeholder)) {
                    fieldA.setText("");
                    fieldA.setForeground(Color.BLACK);
                }
            }

            @Override
            public void focusLost(FocusEvent e) {
                if (fieldA.getText().isEmpty()) {
                    fieldA.setText(placeholder);
                    fieldA.setForeground(Color.GRAY);
                }
            }
        });

        panelC.add(fieldA);
        panelC.add(Box.createRigidArea(new Dimension(10,6)));
        panelC.add(fieldB);




        //BORROW BOOK BUTTON
        panelD = new JPanel();
        panelD.setBounds(200, 200, 200, 85);
        panelD.setLayout(new BoxLayout(panelD, BoxLayout.PAGE_AXIS));
        panelD.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelD.setBackground(Color.decode("#FCFBF4"));

        frameA.add(panelD);

        JButton borrowBook = new JButton("Borrow Book");
        borrowBook.setFont(new Font("Arial", Font.BOLD, 16));
        panelD.add(borrowBook);


        // Action Listener to Borrow Books
        borrowBook.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent y) {
                 try {
                    if(fieldB.getText().equals("")){
        
                      JOptionPane.showMessageDialog(null, "PLEASE ENTER ALL DATA!", "ERROR!", JOptionPane.ERROR_MESSAGE);
                    }
                    else if(fieldA.getText().equals("")){

                    }
                    else{
                        LibraryItem temp = new LibraryItem();
                       int num = Integer.parseInt(userID);
                       temp.borrowBook(num,fieldB.getText(),fieldA.getText() );
                    }
                   } catch (Exception SQLException) {
                    
                   } 
            }
        });
        
        


//-------------------------DISPLAY BORROWED BOOKS-----------------------------

        panelE = new JPanel();
        panelE.setBounds(300, 500, 300, 50);
        panelE.setLayout(new FlowLayout());
        panelE.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelE.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelE);

        JButton DispBorrowedBookTable = new JButton("Display Borrowed Books Table");
        DispBorrowedBookTable.setFont(new Font("Arial", Font.BOLD, 16));

        // Action Listener to Display Books
        DispBorrowedBookTable.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent v) {
                BorrowedBooksTableGUI temp = new BorrowedBooksTableGUI(userID);
                temp.displayBorrowedBookTable();
            }
        });
        panelE.add(DispBorrowedBookTable);



//-------------------------RETURN BORROWED BOOKS-----------------------------   
        panelF = new JPanel();
        panelF.setBounds(400, 80, 200, 80);
        panelF.setLayout(new BoxLayout(panelF, BoxLayout.PAGE_AXIS));
        panelF.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelF.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelF);

        labelD = new JLabel("Return Book:");
        labelD.setFont(new Font("Arial", Font.BOLD, 23)); // Set font and size
        labelD.setForeground(Color.BLACK);
        panelF.add(labelD);

        panelF.add(Box.createRigidArea(new Dimension(10,15)));

        labelE = new JLabel(" Enter Borrow ID: ");
        labelE.setFont(new Font("Arial", Font.PLAIN, 16));
        labelE.setForeground(Color.BLACK);
        panelF.add(labelE);

        //BORROW BOOK TEXT FIELD
        panelG = new JPanel();
        panelG.setBounds(550, 120, 200, 50);
        panelG.setLayout(new BoxLayout(panelG, BoxLayout.PAGE_AXIS));
        panelG.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelG.setBackground(Color.decode("#FCFBF4"));
        frameA.add(panelG);

        fieldC = createJTextField();

        panelG.add(fieldC);

        //BORROW BOOK BUTTON
        panelH = new JPanel();
        panelH.setBounds(600, 165, 200, 85);
        panelH.setLayout(new BoxLayout(panelH, BoxLayout.PAGE_AXIS));
        panelH.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
        panelH.setBackground(Color.decode("#FCFBF4"));

        frameA.add(panelH);

        JButton returnBook = new JButton("Return Book");
        returnBook.setFont(new Font("Arial", Font.BOLD, 16));
        panelH.add(returnBook);

        // Action Listener to Return Books
        returnBook.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent u) {
                try {
                    if(fieldC.getText().equals("")){

                    JOptionPane.showMessageDialog(null, "PLEASE ENTER ALL DATA!", "ERROR!", JOptionPane.ERROR_MESSAGE);
                    }
                    else{
                    LibraryItem temp = new LibraryItem();
                    int num = Integer.parseInt(fieldC.getText());
                     temp.returnBook(num);
                    }
                } catch (Exception SQLException) {
            
           } 
    }
}); 



        frameA.setVisible(true);
    }


public JTextField createJTextField() {
    // Create a JTextField with 10 columns
    JTextField field = new JTextField(10);
    return field;
}






}





