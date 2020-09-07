package ru.yank0vy3rdna.jsf;

import ru.yank0vy3rdna.model.Entry;
import ru.yank0vy3rdna.services.EntryDao;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.naming.NamingException;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@ManagedBean
@SessionScoped
public class EntryBean {
    UUID session_id = UUID.randomUUID();

    private final EntryDao entryDao = new EntryDao();

    private Entry newEntry;

    public Entry getNewEntry() {
        return newEntry;
    }

    public void setNewEntry(Entry newEntry) {
        this.newEntry = newEntry;
    }

    public EntryBean() {
        this.newEntry = new Entry();;
    }

    public double getLastR() throws SQLException, NamingException {
        List<Entry> entryList = getEntries();
        double lastR;
        if (entryList.size() != 0){
            lastR = entryList.get(0).getR();
        }
        else {
            lastR = 1;
        }
        newEntry.setR(lastR);
        return lastR;
    }

    public List<Entry> getEntries() throws SQLException, NamingException {
        return entryDao.getEntries(this.session_id.toString());
    }

    public void addEntry() throws SQLException, NamingException {
        newEntry.setSession_id(session_id.toString());
        newEntry.setTimestamp(System.currentTimeMillis());
        newEntry.check();
        entryDao.addEntry(newEntry);
        newEntry = new Entry();
    }
}
