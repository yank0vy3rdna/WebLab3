package ru.yank0vy3rdna.services;

import ru.yank0vy3rdna.model.Entry;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.faces.application.ResourceDependency;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@SessionScoped
public class EntryDao {
    private DataSource dataSource;

    private Connection connection;

    @PostConstruct
    public void init() throws NamingException {
        initConnection();
    }

    private void initConnection() throws NamingException {
        Context ctx = new InitialContext();
        dataSource = (DataSource) ctx.lookup("java:jboss/lab3ds");

        try {
            connection = dataSource.getConnection();
            connection.createStatement().execute(
                    "create table if not exists results (" +
                            "x float , y float, r float, result boolean, timestamp timestamp, session_id text)"
            );
        } catch (SQLException e) {
            throw new IllegalStateException("Couldn't create connection", e);
        }
    }

    public void addEntry(Entry entry) throws SQLException, NamingException {
        if (connection == null)
            initConnection();
        PreparedStatement s = connection.prepareStatement(
                "insert into results (x, y, r, result, timestamp, session_id) values (?, ?, ?, ?, ?, ?)"
        );
        s.setDouble(1, entry.getX());
        s.setDouble(2, entry.getY());
        s.setDouble(3, entry.getR());
        s.setBoolean(4, entry.isResult());
        s.setTimestamp(5, new Timestamp(entry.getTimestamp()));
        s.setString(6, entry.getSession_id());
        s.execute();
    }

    public List<Entry> getEntries(String session_id) throws SQLException, NamingException {
        if (connection == null)
            initConnection();
        ResultSet rs = connection.createStatement().executeQuery("select * from results order by timestamp desc limit 100");
        List<Entry> result = new ArrayList<>();
        while (rs.next()) {
            Entry current = new Entry();
            current.setX(rs.getDouble("x"));
            current.setY(rs.getDouble("y"));
            current.setR(rs.getDouble("r"));
            current.setResult(rs.getBoolean("result"));
            current.setTimestamp(rs.getTimestamp("timestamp").getTime());
            if (rs.getString("session_id").equals(session_id)) {
                result.add(current);
            }
        }
        return result;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}