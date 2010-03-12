package com.browsermob.pageperf.server.util;

import com.browsermob.pageperf.util.Log;

import java.sql.*;
import java.util.Scanner;

public class SQLUtil {
    private static final Log LOG = new Log();

    public static void execute(String sql, Connection conn) throws SQLException {
        PreparedStatement ps = conn.prepareStatement(sql);
        ps.execute();
        ps.close();
    }

    public static void runScript(String sql, Connection conn) throws SQLException {
        Scanner s = new Scanner(sql);
        s.useDelimiter("(;(\r)?\n)|(--\n)");
        Statement st = null;
        try {
            st = conn.createStatement();
            while (s.hasNext()) {
                String line = s.next();
                if (line.startsWith("/*!") && line.endsWith("*/")) {
                    int i = line.indexOf(' ');
                    line = line.substring(i + 1, line.length() - " */".length());
                }

                if (line.trim().length() > 0) {
                    st.execute(line);
                }
            }
        }
        finally {
            if (st != null) st.close();
            if (conn != null) conn.close();
        }

    }

    public static long insert(Connection conn, String sql, Object... values) throws SQLException {
        StringBuilder sb = new StringBuilder(sql).append(" VALUES (");
        for (int i = 0; i < values.length; i++) {
            sb.append("?");
            if (i != values.length - 1) {
                sb.append(",");
            }
        }
        sb.append(")");
        sql = sb.toString();

        PreparedStatement ps = conn.prepareStatement(sql);
        for (int i = 1; i <= values.length; i++) {
            Object value = values[i - 1];

            if (value instanceof String) {
                ps.setString(i, (String) value);
            } else if (value instanceof Long) {
                ps.setLong(i, (Long) value);
            } else if (value instanceof Integer) {
                ps.setInt(i, (Integer) value);
            } else if (value instanceof Timestamp) {
                ps.setTimestamp(i, (Timestamp) value);
            } else if (value instanceof Date) {
                ps.setDate(i, (Date) value);
            } else {
                throw new RuntimeException("Unknown object type " + value.getClass());
            }
        }

        ps.executeUpdate();

        ResultSet rs = ps.getGeneratedKeys();
        rs.next();

        return rs.getLong(1);
    }

    public static void close(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                LOG.warn("Could not close Connection");
            }
        }
    }

    public static void close(Connection conn, PreparedStatement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
        } catch (SQLException e) {
            LOG.warn("Could not close PreparedStatement", e);
        }

        close(conn);
    }

    public static void close(Connection conn, PreparedStatement ps, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
        } catch (SQLException e) {
            LOG.warn("Could not close ResultSet", e);
        }

        close(conn, ps);
    }
}
