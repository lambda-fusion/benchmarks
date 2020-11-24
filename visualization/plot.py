# imports
import pandas as pd
import plotly.express as px
import plotly.graph_objs as go
import os

# data
d_chain = {'Memory size': ["1024MB", "320MB", "1024MB", "320MB", "1024MB", "320MB", "1024MB", "320MB"],
     'Type': ["Best case", "Best case", "Hill climbing", "Hill climbing", "Heuristic", "Heuristic", "Worst case", "Worst case"],
     'runtime': [100, 200, 2571, 7261, 450, 550, 2701, 8350]}

d_parallel = {'Memory size': ["1024MB", "320MB", "1024MB", "320MB", "1024MB", "320MB", "1024MB", "320MB"],
     'Type': ["Best case", "Best case", "Hill climbing", "Hill climbing", "Heuristic", "Heuristic", "Worst case", "Worst case"],
     'runtime': [3354, 200, 3382, 9825, 4809, 9883, 4962, 19936]}

df_chain = pd.DataFrame(data=d_chain)


# assign colors to type using a dictionary
colors = {'Best case':'steelblue',
          'Worst case':'firebrick',
          'Hill climbing':'darkkhaki',
          'Heuristic': 'darkolivegreen'}

fig_chain = px.bar(df_chain, y='runtime',  x='Memory size',  color="Type", barmode='group', labels={"runtime": "average execution time (ms)", "Type": ""}, color_discrete_map=colors)
fig_chain['layout'].update(title = "Chain",
                xaxis = dict(showgrid=False))
fig_chain.update(layout=dict(title=dict(x=0.5)))

fig_parallel = px.bar(d_parallel, y='runtime',  x='Memory size',  color="Type", barmode='group', labels={"runtime": "average execution time (ms)", "Type": ""}, color_discrete_map=colors)
fig_parallel['layout'].update(title = "Parallel",
                xaxis = dict(showgrid=False))
fig_parallel.update(layout=dict(title=dict(x=0.5)))

# legend
# legend = dict(
#     orientation="h",
#     yanchor="bottom",
#     y=-0.08,
#     xanchor="center",
#     x=0.5
# )
# fig_chain.update_layout(legend=legend)
# fig_parallel.update_layout(legend=legend)

if not os.path.exists("images"):
    os.mkdir("images")
    
fig_chain.write_image("images/fig_chain.png")
fig_parallel.write_image("images/fig_parallel.png")