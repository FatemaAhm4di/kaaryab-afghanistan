'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #09637e',
    paddingBottom: 15,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#09637e',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#088395',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    fontSize: 10,
    color: '#4a5568',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#09637e',
    marginBottom: 8,
    borderBottom: '1px solid #d1eef2',
    paddingBottom: 4,
  },
  text: {
    fontSize: 10,
    color: '#2d3748',
    lineHeight: 1.5,
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#4a5568',
  },
  itemDate: {
    fontSize: 9,
    color: '#718096',
  },
  skillBadge: {
    backgroundColor: '#d1eef2',
    padding: '4 8',
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 9,
    color: '#09637e',
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  bullet: {
    fontSize: 10,
    color: '#2d3748',
    marginBottom: 2,
    paddingLeft: 4,
  },
});

type CVTemplateProps = {
  data: {
    personal: {
      firstName: string;
      lastName: string;
      title: string;
      email: string;
      phone: string;
      address: string;
      website?: string;
      linkedin?: string;
      github?: string;
    };
    summary: string;
    skills: string[];
    experience: {
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }[];
    education: {
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description?: string;
    }[];
    projects: {
      name: string;
      description: string;
      technologies: string[];
      link?: string;
    }[];
    languages: {
      name: string;
      level: string;
    }[];
    certifications: {
      name: string;
      issuer: string;
      date: string;
      link?: string;
    }[];
  };
};

export function CVTemplate({ data }: CVTemplateProps) {
  const fullName = `${data.personal.firstName} ${data.personal.lastName}`.trim() || 'Your Name';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          {data.personal.title && <Text style={styles.title}>{data.personal.title}</Text>}
          <View style={styles.contactRow}>
            {data.personal.email && <Text>✉ {data.personal.email}</Text>}
            {data.personal.phone && <Text>📱 {data.personal.phone}</Text>}
            {data.personal.address && <Text>📍 {data.personal.address}</Text>}
          </View>
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((skill, i) => (
                <View key={i} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                {exp.description && <Text style={styles.bullet}>• {exp.description}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.item}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </Text>
                </View>
                {edu.field && <Text style={styles.bullet}>• {edu.field}</Text>}
                {edu.description && <Text style={styles.bullet}>• {edu.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}