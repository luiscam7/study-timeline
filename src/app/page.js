'use client';

import { useState, useEffect } from 'react';

const WEEKS = [
  {
    n: 1,
    title: 'Rust Foundations',
    sub: 'Ownership, Types & Control Flow',
    days: [
      'Install Rust + Cargo. Read The Book ch.1-3. Write Hello World + guessing game.',
      'Variables, mutability, data types, functions. Build a temperature converter.',
      'Ownership, borrowing, references, slices (The Book ch.4). Practice ownership diagrams.',
      'Structs, enums, pattern matching (ch.5-6). Build a state machine with enums.',
      'Mini project: CLI task tracker using structs, enums, and pattern matching.',
    ],
    tags: ['rust'],
    resources: 'The Book (doc.rust-lang.org/book) ch.1-6 · Rust by Example · rustlings exercises',
  },
  {
    n: 2,
    title: 'Traits, Generics & Error Handling',
    sub: 'Rust\'s Type System',
    days: [
      'Generics deep dive (ch.10). Write generic math functions.',
      'Traits: defining, deriving, trait bounds, blanket impls. Build a Shape trait.',
      'Error handling: Result, Option, map, and_then, ? operator (ch.9).',
      'anyhow & thiserror crates. Convert a CLI tool to use proper errors.',
      'Mini project: Generic config parser with custom error types and trait impls.',
    ],
    tags: ['rust'],
    resources: 'The Book ch.9-10, 17 · thiserror & anyhow crate docs',
  },
  {
    n: 3,
    title: 'Async Rust & Tokio',
    sub: 'Concurrency for AI Workloads',
    days: [
      'Async/await basics. Futures and executors. Run async main with tokio.',
      'Tokio tasks: spawn, JoinSet, structured concurrency. Fetch URLs concurrently.',
      'Channels: oneshot, mpsc, broadcast. Build a pub/sub message bus.',
      'Streaming: tokio_stream, Stream trait, async iterators. Process a stream of events.',
      'Mini project: Async web scraper — fetch + parse multiple pages concurrently.',
    ],
    tags: ['rust', 'async'],
    resources: 'Tokio Tutorial (tokio.rs/tokio/tutorial) · Async Book · tokio docs',
  },
  {
    n: 4,
    title: 'Rig Setup & First Agent',
    sub: 'Hello, Rig!',
    days: [
      'Install Ollama, pull a model (gemma3:7b or qwen2.5:7b). Test via curl.',
      'Create Rust project with rig-core + tokio. Configure Ollama client.',
      'Build first agent with preamble. Prompt and print responses.',
      'Experiment with temperature, max_tokens, model params. Compare outputs.',
      'Mini project: Chat CLI that maintains conversation history with Rig agent.',
    ],
    tags: ['rig'],
    resources: 'Rig docs (docs.rig.rs) · Rig GitHub examples · Ollama docs',
  },
  {
    n: 5,
    title: 'Rig Agent Tools',
    sub: 'Giving Your Agent Superpowers',
    days: [
      'ToolDef derive macro. Write a simple calculator tool.',
      'Function-as-tool macro. Build file read/write tools.',
      'Manual tool calls: inspect partial results, validate before next step.',
      'Multi-turn agent with max_turns. Debug tool call chains.',
      'Mini project: Agent with web search + calculator + file tools (multi-turn).',
    ],
    tags: ['rig', 'agent'],
    resources: 'Rig examples: agent_with_tools.rs · calculator_chatbot.rs · agent_autonomous.rs',
  },
  {
    n: 6,
    title: 'Memory & Streaming',
    sub: 'Agents That Remember',
    days: [
      'In-memory conversation memory. Track history across turns.',
      'rig-memory crate: window and summary policies. Compare approaches.',
      'Streaming: agent.stream() + tokio_stream. Display tokens live.',
      'Context pruning: manage token budgets, summarize old history.',
      'Mini project: Persistent chat agent that remembers across restarts.',
    ],
    tags: ['rig', 'agent'],
    resources: 'agent_with_memory.rs · agent_with_memory_streaming.rs · rig-memory crate',
  },
  {
    n: 7,
    title: 'RAG with Rig',
    sub: 'Retrieval-Augmented Generation',
    days: [
      'Embedding models with Ollama (all-minilm, nomic-embed-text). Compute similarity.',
      'In-memory vector store. Index and query a set of documents.',
      'rig-sqlite vector store. Persist embeddings to disk.',
      'Full RAG pipeline: load docs → embed → store → retrieve → augment → generate.',
      'Mini project: Documentation QA agent — indexes Rig docs, answers questions.',
    ],
    tags: ['rig', 'rag'],
    resources: 'rag.rs · rag_dynamic_tools.rs · pdf_agent.rs · Ollama embedding docs',
  },
  {
    n: 8,
    title: 'Multi-Agent Patterns',
    sub: 'Orchestration & Coordination',
    days: [
      'Routing: classify input, route to specialized agent (math/code/general).',
      'Parallelization: multiple agents running different tasks concurrently.',
      'Orchestrator: coordinator agent delegates to worker agents.',
      'Evaluator-optimizer: generator + critic loop. Build a code reviewer.',
      'Mini project: Multi-agent research system (orchestrator + 3 specialists).',
    ],
    tags: ['agent'],
    resources: 'agent_routing.rs · agent_parallelization.rs · agent_orchestrator.rs · multi_agent.rs',
  },
  {
    n: 9,
    title: 'MCP Integration',
    sub: 'Model Context Protocol',
    days: [
      'MCP architecture: tools, resources, transports (stdio, HTTP).',
      'Set up rig-mcp. Connect to a filesystem MCP server.',
      'Connect to external MCP servers (web fetch, GitHub API, SQLite).',
      'Build a custom MCP server in Rust for your specific use case.',
      'Mini project: Agent with combined local tools + MCP server tools.',
    ],
    tags: ['rig', 'agent', 'mcp'],
    resources: 'rig-mcp crate · rmcp docs · modelcontextprotocol.io · MCP Servers directory',
  },
  {
    n: 10,
    title: 'Final Project',
    sub: 'Build a Complete AI Agent',
    days: [
      'Design your agent: capabilities, tools, memory strategy. Sketch architecture.',
      'Core agent scaffold: tools, preamble, agent loop. Get minimal version running.',
      'RAG integration: index your docs/code/notes into a vector store.',
      'Polish: error handling, logging, streaming output, token tracking.',
      'Deploy: CLI binary, optional HTTP server (axum) or Discord bot (serenity).',
    ],
    tags: ['project'],
    resources: 'All previous resources · discord_bot.rs · Ollama model library · Hugging Face',
  },
];

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export default function Home() {
  const [expanded, setExpanded] = useState(4);
  const [dark, setDark] = useState(false);
  const [done, setDone] = useState({});
  const today = new Date();
  const dateStr = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;

  // Load from localStorage
  useEffect(() => {
    try {
      const savedDone = localStorage.getItem('st-done');
      if (savedDone) setDone(JSON.parse(savedDone));
      const savedDark = localStorage.getItem('st-dark');
      if (savedDark !== null) setDark(savedDark === 'true');
    } catch (_) {}
  }, []);

  // Persist
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('st-dark', dark);
  }, [dark]);

  useEffect(() => {
    localStorage.setItem('st-done', JSON.stringify(done));
  }, [done]);

  const toggle = (n) => setExpanded(expanded === n ? null : n);

  const toggleDay = (weekNum, dayIdx, e) => {
    e.stopPropagation();
    setDone((prev) => ({
      ...prev,
      [`${weekNum}-${dayIdx}`]: !prev[`${weekNum}-${dayIdx}`],
    }));
  };

  return (
    <div className="container">
      <div className="header">
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? '☀️' : '🌙'}
        </button>
        <h1>🗓️ Study Timeline</h1>
        <div className="sub">Rust → AI Agents with Rig + Local LLMs</div>
        <div className="today">{dateStr}</div>
      </div>

      <div className="timeline">
        {WEEKS.map((w) => {
          const allDone = w.days.every((_, i) => done[`${w.n}-${i}`]);
          const status = allDone ? 'completed' : 'upcoming';
          return (
            <div
              key={w.n}
              className={`week-card ${status} ${expanded === w.n ? 'active' : ''}`}
              onClick={() => toggle(w.n)}
            >
              <div className="week-dot">
                <span className="week-num">{allDone ? '✓' : w.n}</span>
              </div>

              <div className="week-header-row">
                <div>
                  <div className="week-title">{w.title}</div>
                  <div className="week-subtitle">{w.sub}</div>
                  <div className="tags">
                    {w.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <span className={`week-badge ${status}`}>
                  {allDone && '✓ '}
                  {allDone ? 'done' : 'upcoming'}
                </span>
              </div>

              {expanded === w.n && (
                <div className="expanded">
                  <div className="day-list">
                    {w.days.map((d, i) => {
                      const isDone = done[`${w.n}-${i}`];
                      return (
                        <div
                          key={i}
                          className="day-item"
                          onClick={(e) => toggleDay(w.n, i, e)}
                          style={{
                            opacity: isDone ? 0.45 : 1,
                            cursor: 'pointer',
                            userSelect: 'none',
                          }}
                        >
                          <span className="day-label">Day {i + 1}</span>
                          <span
                            className="day-text"
                            style={{
                              textDecoration: isDone ? 'line-through' : 'none',
                            }}
                          >
                            {isDone ? '✓ ' : ''}{d}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {w.resources && (
                    <div className="resources">{w.resources}</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="footer">
        Built with <a href="https://nextjs.org">Next.js</a> ·{' '}
        <a href="https://docs.rig.rs">Rig</a> + <a href="https://ollama.com">Ollama</a>
      </div>
    </div>
  );
}
