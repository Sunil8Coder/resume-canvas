import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import { PersonalInfoForm } from '@/components/resume/PersonalInfoForm';
import { ExperienceForm } from '@/components/resume/ExperienceForm';
import { EducationForm } from '@/components/resume/EducationForm';
import { SkillsForm } from '@/components/resume/SkillsForm';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { TemplateSelector } from '@/components/resume/TemplateSelector';
import { ExportButton } from '@/components/resume/ExportButton';
import { ResumeProvider, useResume } from '@/contexts/ResumeContext';
import { FileText } from 'lucide-react';

const sectionComponents: Record<string, React.FC<{ dragHandleProps?: DraggableProvidedDragHandleProps | null; isDragging?: boolean }>> = {
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
};

const ResumeBuilderContent: React.FC = () => {
  const { resumeData, selectedTemplate, setSelectedTemplate, reorderSections } = useResume();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const newOrder = Array.from(resumeData.sectionOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    
    reorderSections(newOrder);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">Create your professional resume</p>
            </div>
          </div>
          <ExportButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Form Panel */}
        <div className="w-full lg:w-1/2 xl:w-2/5 border-r border-border bg-panel overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Template Selection */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-foreground">Choose Template</h2>
              <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} />
            </div>

            {/* Personal Info (not draggable) */}
            <PersonalInfoForm />

            {/* Draggable Sections */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {resumeData.sectionOrder.map((sectionId, index) => {
                      const SectionComponent = sectionComponents[sectionId];
                      if (!SectionComponent) return null;
                      
                      return (
                        <Draggable key={sectionId} draggableId={sectionId} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <SectionComponent
                                dragHandleProps={provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-full lg:w-1/2 xl:w-3/5 bg-muted/30 overflow-auto min-h-screen">
          <div className="p-6">
            <div className="sticky top-6">
              <div className="overflow-hidden rounded-xl shadow-2xl" style={{ width: 'fit-content' }}>
                <ResumePreview data={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
};

export default Index;
