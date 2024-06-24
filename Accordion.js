// Accordion.js
import React, { useState, useEffect } from 'react';
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, Button, IconButton } from '@mui/material';
import { FaTrash, FaEdit } from 'react-icons/fa';
import TopicDialog from './TopicDialog';
import EditDialog from './EditDialog';
import '../CalendarCustom.css';

function Accordion({ onSelectSubTopic, onSelectSubSubTopic, initialTopics }) {
  console.log('Received initialTopics:', initialTopics); // 디버깅 로그 추가
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem('topics');
    return savedTopics ? JSON.parse(savedTopics) : initialTopics;
  });

  const [expanded, setExpanded] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newSubTopicTitle, setNewSubTopicTitle] = useState('');
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
  const [currentSubTopicIndex, setCurrentSubTopicIndex] = useState(null);
  const [currentSubSubTopicIndex, setCurrentSubSubTopicIndex] = useState(null); // Added for sub-sub-topic index
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('topics', JSON.stringify(topics));
  }, [topics]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const handleAddNewSubTopic = (topicIndex, subTopicIndex = null) => {
    setCurrentTopicIndex(topicIndex);
    setCurrentSubTopicIndex(subTopicIndex);
    setCurrentSubSubTopicIndex(null);
    setDialogOpen(true);
  };

  const handleDeleteTopic = (topicIndex, subTopicIndex = null, subSubTopicIndex = null) => {
    const updatedTopics = [...topics];
    if (subSubTopicIndex !== null) {
      updatedTopics[topicIndex].subTopics[subTopicIndex].subTopics.splice(subSubTopicIndex, 1);
    } else if (subTopicIndex !== null) {
      updatedTopics[topicIndex].subTopics.splice(subTopicIndex, 1);
    } else {
      updatedTopics.splice(topicIndex, 1);
    }
    setTopics(updatedTopics);
  };

  const handleEditTopic = (topicIndex, subTopicIndex = null, subSubTopicIndex = null) => {
    setCurrentTopicIndex(topicIndex);
    setCurrentSubTopicIndex(subTopicIndex);
    setCurrentSubSubTopicIndex(subSubTopicIndex);
    const title = subSubTopicIndex !== null
      ? topics[topicIndex].subTopics[subTopicIndex].subTopics[subSubTopicIndex].title
      : subTopicIndex !== null
        ? topics[topicIndex].subTopics[subTopicIndex].title
        : topics[topicIndex].title;
    setEditTitle(title);
    setEditDialogOpen(true);
  };

  const handleSaveNewSubTopic = () => {
    if (newSubTopicTitle) {
      const updatedTopics = [...topics];
      if (currentSubTopicIndex === null) {
        updatedTopics[currentTopicIndex].subTopics.push({ title: newSubTopicTitle, subTopics: [] });
      } else {
        updatedTopics[currentTopicIndex].subTopics[currentSubTopicIndex].subTopics.push({ title: newSubTopicTitle, subTopics: [] });
      }
      setTopics(updatedTopics);
      setDialogOpen(false);
      setNewSubTopicTitle('');
    }
  };

  const handleSaveEdit = () => {
    if (editTitle) {
      const updatedTopics = [...topics];
      if (currentSubTopicIndex === null) {
        updatedTopics[currentTopicIndex].title = editTitle;
      } else if (currentSubSubTopicIndex === null) {
        updatedTopics[currentTopicIndex].subTopics[currentSubTopicIndex].title = editTitle;
      } else {
        updatedTopics[currentTopicIndex].subTopics[currentSubTopicIndex].subTopics[currentSubSubTopicIndex].title = editTitle;
      }
      setTopics(updatedTopics);
      setEditDialogOpen(false);
      setEditTitle('');
    }
  };

  return (
    <div className="accordion">
      {topics.map((topic, index) => (
        <div key={index} className="topic-wrapper">
          <MuiAccordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{topic.title}</Typography>
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: 'auto' }}>
                <IconButton onClick={() => handleEditTopic(index)} size="small">
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleDeleteTopic(index)} size="small">
                  <FaTrash />
                </IconButton>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {topic.subTopics.map((subTopic, subIndex) => (
                  <div key={subIndex} className="subtopic-wrapper">
                    <MuiAccordion>
                      <AccordionSummary
                        aria-controls={`subpanel${subIndex}bh-content`}
                        id={`subpanel${subIndex}bh-header`}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <Typography style={{ fontSize: '0.96rem', fontWeight: 'bold' }}>{subTopic.title}</Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: 'auto' }}>
                          <IconButton onClick={() => handleEditTopic(index, subIndex)} size="small">
                            <FaEdit />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteTopic(index, subIndex)} size="small">
                            <FaTrash />
                          </IconButton>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          {subTopic.subTopics.map((subSubTopic, subSubIndex) => (
                            <Typography key={subSubIndex} onClick={() => { onSelectSubSubTopic(subSubTopic.title); alert("일정이 추가되었습니다!"); }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              {subSubTopic.title}
                              <div style={{ display: 'flex', justifyContent: 'flex-end', width: 'auto' }}>
                                <IconButton onClick={() => handleEditTopic(index, subIndex, subSubIndex)} size="small">
                                  <FaEdit />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteTopic(index, subIndex, subSubIndex)} size="small">
                                  <FaTrash />
                                </IconButton>
                              </div>
                            </Typography>
                          ))}
                          <Button onClick={() => handleAddNewSubTopic(index, subIndex)} variant="outlined" color="primary">
                            세부 주제 추가
                          </Button>
                        </div>
                      </AccordionDetails>
                    </MuiAccordion>
                  </div>
                ))}
                <Button onClick={() => handleAddNewSubTopic(index)} variant="outlined" color="primary">
                  내가 만들기
                </Button>
              </div>
            </AccordionDetails>
          </MuiAccordion>
        </div>
      ))}
      <TopicDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveNewSubTopic}
        title={newSubTopicTitle}
        setTitle={setNewSubTopicTitle}
      />
      <EditDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        title={editTitle}
        setTitle={setEditTitle}
      />
    </div>
  );
}

export default Accordion;
