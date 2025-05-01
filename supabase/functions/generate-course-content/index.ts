
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, moduleType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Create a system message with detailed DSP training context
    const systemMessage = `You are an expert educational content creator specializing in training for Direct Support Professionals (DSPs) who work with young adults with developmental disabilities.

Your audience is DSPs who need training that is:
- Clear and accessible with plain language
- Practical with real-world examples
- Focused on person-centered support
- Compliant with industry regulations
- Respectful of individuals with disabilities

Create content that supports learning through multiple modalities and incorporates best practices for teaching skills needed in supportive living settings.`;

    // Create a prompt based on the course title and module type
    let userPrompt = `Generate educational content for a course titled "${title}" for Direct Support Professionals working with young adults with developmental disabilities.`;
    
    if (moduleType === 'description') {
      userPrompt += ` Create a comprehensive course description that explains the purpose, learning objectives, and key topics covered in this course. Format it in a professional and engaging style with paragraphs and bullet points where appropriate.`;
    } else if (moduleType === 'module') {
      userPrompt += ` Create a module outline with title, description, and 3-4 key learning topics for this course. For each topic, provide a brief description of what will be covered. Format as a structured outline.`;
    } else if (moduleType === 'quiz') {
      userPrompt += ` Create 5 multiple-choice quiz questions with answers related to this subject. Include 4 options for each question, with only one correct answer. Format the output as a JSON array with the following structure:
      [
        {
          "question": "Question text here?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option that is correct"
        }
      ]`;
    }

    console.log(`Sending prompt to OpenAI: ${userPrompt}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Successfully generated content');

    return new Response(JSON.stringify({ 
      content: generatedContent 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-course-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
